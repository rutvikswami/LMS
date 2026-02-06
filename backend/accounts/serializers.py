from django.contrib.auth import authenticate
from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User


class SignupSerializer(serializers.ModelSerializer):
    """
    User registration serializer.
    Assigns user to Student or Creator group.
    """

    password = serializers.CharField(write_only=True)
    group = serializers.ChoiceField(
        choices=["Student", "Creator"],
        write_only=True
    )

    class Meta:
        model = User
        fields = ("email", "user_name", "password", "group")

    def create(self, validated_data):
        group_name = validated_data.pop("group")
        password = validated_data.pop("password")

        # 1. Create user
        user = User.objects.create_user(
            email=validated_data["email"],
            user_name=validated_data["user_name"],
            password=password
        )

        # 2. Assign group (SAFE & EXPLICIT)
        try:
            group = Group.objects.get(name=group_name)
            user.groups.add(group)
        except Group.DoesNotExist:
            raise serializers.ValidationError(
                {"group": f"Group '{group_name}' does not exist"}
            )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        user = authenticate(
            email=attrs["email"],
            password=attrs["password"]
        )

        if not user:
            raise serializers.ValidationError("Invalid email or password")

        refresh = RefreshToken.for_user(user)

        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
