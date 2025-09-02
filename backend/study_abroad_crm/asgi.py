"""
ASGI config for Study Abroad CRM project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'study_abroad_crm.settings')

application = get_asgi_application()
