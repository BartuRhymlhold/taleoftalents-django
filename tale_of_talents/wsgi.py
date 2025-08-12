"""
WSGI config for tale_of_talents project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tale_of_talents.settings')

application = get_wsgi_application()