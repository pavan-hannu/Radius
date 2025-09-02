"""
WSGI config for Study Abroad CRM project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'study_abroad_crm.settings')

application = get_wsgi_application()
