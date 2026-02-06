from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from courses.models import Course, Section, Chapter

User = get_user_model()


class Command(BaseCommand):
    help = 'Populate database with sample courses, sections, and chapters'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Create a creator user
        try:
            creator = User.objects.get(email='creator@example.com')
            self.stdout.write(f'Using existing creator user: {creator.email}')
        except User.DoesNotExist:
            creator = User.objects.create_user(
                email='creator@example.com',
                user_name='Course Creator',
                password='password123'
            )
            creator.is_staff = True
            creator.save()
            self.stdout.write(self.style.SUCCESS(f'Created creator user: {creator.email}'))

        # Course 1: Python Programming
        course1 = Course.objects.create(
            creator=creator,
            title='Complete Python Programming Masterclass',
            description='Learn Python from scratch to advanced. Master data structures, OOP, web development, and more.',
            thumbnail='https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800'
        )

        section1_1 = Section.objects.create(course=course1, title='Introduction to Python', order=1)
        Chapter.objects.create(section=section1_1, title='What is Python?', content='Introduction to Python programming language', duration_minutes=10, order=1)
        Chapter.objects.create(section=section1_1, title='Installing Python', content='How to install Python on your system', duration_minutes=15, order=2)
        Chapter.objects.create(section=section1_1, title='Your First Python Program', content='Write your first Hello World program', duration_minutes=12, order=3)

        section1_2 = Section.objects.create(course=course1, title='Python Basics', order=2)
        Chapter.objects.create(section=section1_2, title='Variables and Data Types', content='Understanding variables, strings, numbers, and booleans', duration_minutes=20, order=1)
        Chapter.objects.create(section=section1_2, title='Operators', content='Arithmetic, comparison, and logical operators', duration_minutes=18, order=2)
        Chapter.objects.create(section=section1_2, title='Control Flow', content='If statements and conditionals', duration_minutes=22, order=3)
        Chapter.objects.create(section=section1_2, title='Loops', content='For and while loops', duration_minutes=25, order=4)

        section1_3 = Section.objects.create(course=course1, title='Data Structures', order=3)
        Chapter.objects.create(section=section1_3, title='Lists', content='Working with Python lists', duration_minutes=30, order=1)
        Chapter.objects.create(section=section1_3, title='Tuples', content='Understanding tuples', duration_minutes=20, order=2)
        Chapter.objects.create(section=section1_3, title='Dictionaries', content='Key-value pairs with dictionaries', duration_minutes=28, order=3)
        Chapter.objects.create(section=section1_3, title='Sets', content='Unique collections with sets', duration_minutes=22, order=4)

        # Course 2: Web Development
        course2 = Course.objects.create(
            creator=creator,
            title='Modern Web Development Bootcamp',
            description='Build modern websites and web applications with HTML, CSS, JavaScript, and React.',
            thumbnail='https://images.unsplash.com/photo-1547658719-da2b51169166?w=800'
        )

        section2_1 = Section.objects.create(course=course2, title='HTML Fundamentals', order=1)
        Chapter.objects.create(section=section2_1, title='Introduction to HTML', content='What is HTML and how it works', duration_minutes=15, order=1)
        Chapter.objects.create(section=section2_1, title='HTML Elements and Tags', content='Common HTML elements', duration_minutes=20, order=2)
        Chapter.objects.create(section=section2_1, title='Forms and Input', content='Creating interactive forms', duration_minutes=25, order=3)
        Chapter.objects.create(section=section2_1, title='Semantic HTML', content='Writing meaningful HTML', duration_minutes=18, order=4)

        section2_2 = Section.objects.create(course=course2, title='CSS Styling', order=2)
        Chapter.objects.create(section=section2_2, title='CSS Basics', content='Selectors, properties, and values', duration_minutes=22, order=1)
        Chapter.objects.create(section=section2_2, title='Box Model', content='Understanding padding, margin, and borders', duration_minutes=20, order=2)
        Chapter.objects.create(section=section2_2, title='Flexbox', content='Modern layout with Flexbox', duration_minutes=30, order=3)
        Chapter.objects.create(section=section2_2, title='Grid Layout', content='CSS Grid for complex layouts', duration_minutes=28, order=4)
        Chapter.objects.create(section=section2_2, title='Responsive Design', content='Media queries and mobile-first design', duration_minutes=25, order=5)

        section2_3 = Section.objects.create(course=course2, title='JavaScript Essentials', order=3)
        Chapter.objects.create(section=section2_3, title='JavaScript Introduction', content='Getting started with JavaScript', duration_minutes=15, order=1)
        Chapter.objects.create(section=section2_3, title='DOM Manipulation', content='Interacting with the Document Object Model', duration_minutes=30, order=2)
        Chapter.objects.create(section=section2_3, title='Events', content='Handling user interactions', duration_minutes=25, order=3)
        Chapter.objects.create(section=section2_3, title='Async JavaScript', content='Promises and async/await', duration_minutes=35, order=4)

        # Course 3: Data Science
        course3 = Course.objects.create(
            creator=creator,
            title='Data Science with Python',
            description='Master data analysis, visualization, and machine learning with Python.',
            thumbnail='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
        )

        section3_1 = Section.objects.create(course=course3, title='Introduction to Data Science', order=1)
        Chapter.objects.create(section=section3_1, title='What is Data Science?', content='Overview of data science field', duration_minutes=12, order=1)
        Chapter.objects.create(section=section3_1, title='Setting Up Environment', content='Installing Jupyter and libraries', duration_minutes=18, order=2)
        Chapter.objects.create(section=section3_1, title='NumPy Basics', content='Working with numerical arrays', duration_minutes=25, order=3)

        section3_2 = Section.objects.create(course=course3, title='Data Analysis with Pandas', order=2)
        Chapter.objects.create(section=section3_2, title='Pandas Introduction', content='DataFrames and Series', duration_minutes=20, order=1)
        Chapter.objects.create(section=section3_2, title='Data Cleaning', content='Handling missing data', duration_minutes=28, order=2)
        Chapter.objects.create(section=section3_2, title='Data Transformation', content='Reshaping and aggregating data', duration_minutes=30, order=3)
        Chapter.objects.create(section=section3_2, title='Merging Data', content='Joins and concatenations', duration_minutes=25, order=4)

        section3_3 = Section.objects.create(course=course3, title='Data Visualization', order=3)
        Chapter.objects.create(section=section3_3, title='Matplotlib Basics', content='Creating basic plots', duration_minutes=22, order=1)
        Chapter.objects.create(section=section3_3, title='Seaborn Advanced Plots', content='Statistical visualizations', duration_minutes=28, order=2)
        Chapter.objects.create(section=section3_3, title='Interactive Visualizations', content='Using Plotly', duration_minutes=30, order=3)

        # Course 4: Mobile App Development
        course4 = Course.objects.create(
            creator=creator,
            title='React Native - Build Mobile Apps',
            description='Create native mobile applications for iOS and Android using React Native.',
            thumbnail='https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800'
        )

        section4_1 = Section.objects.create(course=course4, title='Getting Started', order=1)
        Chapter.objects.create(section=section4_1, title='React Native Overview', content='Introduction to React Native', duration_minutes=15, order=1)
        Chapter.objects.create(section=section4_1, title='Development Environment Setup', content='Setting up your dev environment', duration_minutes=25, order=2)
        Chapter.objects.create(section=section4_1, title='First React Native App', content='Building your first app', duration_minutes=20, order=3)

        section4_2 = Section.objects.create(course=course4, title='React Native Components', order=2)
        Chapter.objects.create(section=section4_2, title='Core Components', content='View, Text, Image, and more', duration_minutes=30, order=1)
        Chapter.objects.create(section=section4_2, title='Lists and ScrollViews', content='Displaying scrollable content', duration_minutes=25, order=2)
        Chapter.objects.create(section=section4_2, title='User Input', content='TextInput and forms', duration_minutes=22, order=3)
        Chapter.objects.create(section=section4_2, title='Styling Components', content='StyleSheet and Flexbox', duration_minutes=28, order=4)

        section4_3 = Section.objects.create(course=course4, title='Navigation', order=3)
        Chapter.objects.create(section=section4_3, title='React Navigation Setup', content='Installing navigation library', duration_minutes=18, order=1)
        Chapter.objects.create(section=section4_3, title='Stack Navigator', content='Screen-to-screen navigation', duration_minutes=25, order=2)
        Chapter.objects.create(section=section4_3, title='Tab Navigator', content='Bottom tab navigation', duration_minutes=22, order=3)
        Chapter.objects.create(section=section4_3, title='Drawer Navigator', content='Side menu navigation', duration_minutes=20, order=4)

        # Course 5: Machine Learning
        course5 = Course.objects.create(
            creator=creator,
            title='Machine Learning A-Z',
            description='Learn Machine Learning algorithms from scratch. Build real-world ML models.',
            thumbnail='https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800'
        )

        section5_1 = Section.objects.create(course=course5, title='Machine Learning Basics', order=1)
        Chapter.objects.create(section=section5_1, title='What is Machine Learning?', content='Introduction to ML concepts', duration_minutes=15, order=1)
        Chapter.objects.create(section=section5_1, title='Types of Machine Learning', content='Supervised, unsupervised, and reinforcement learning', duration_minutes=20, order=2)
        Chapter.objects.create(section=section5_1, title='ML Workflow', content='Steps in building ML models', duration_minutes=18, order=3)

        section5_2 = Section.objects.create(course=course5, title='Supervised Learning', order=2)
        Chapter.objects.create(section=section5_2, title='Linear Regression', content='Predicting continuous values', duration_minutes=30, order=1)
        Chapter.objects.create(section=section5_2, title='Logistic Regression', content='Classification problems', duration_minutes=28, order=2)
        Chapter.objects.create(section=section5_2, title='Decision Trees', content='Tree-based models', duration_minutes=25, order=3)
        Chapter.objects.create(section=section5_2, title='Random Forests', content='Ensemble learning', duration_minutes=30, order=4)
        Chapter.objects.create(section=section5_2, title='Support Vector Machines', content='SVM for classification', duration_minutes=32, order=5)

        section5_3 = Section.objects.create(course=course5, title='Neural Networks', order=3)
        Chapter.objects.create(section=section5_3, title='Introduction to Neural Networks', content='Basic architecture', duration_minutes=25, order=1)
        Chapter.objects.create(section=section5_3, title='Deep Learning Basics', content='Multi-layer networks', duration_minutes=30, order=2)
        Chapter.objects.create(section=section5_3, title='Training Neural Networks', content='Backpropagation and optimization', duration_minutes=35, order=3)
        Chapter.objects.create(section=section5_3, title='Convolutional Neural Networks', content='CNNs for image processing', duration_minutes=40, order=4)

        self.stdout.write(self.style.SUCCESS('✅ Successfully created 5 courses with sections and chapters!'))
        self.stdout.write(self.style.SUCCESS(f'Total Courses: {Course.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Total Sections: {Section.objects.count()}'))
        self.stdout.write(self.style.SUCCESS(f'Total Chapters: {Chapter.objects.count()}'))
