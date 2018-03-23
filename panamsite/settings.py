"""
Django settings for panamsite project.

Generated by 'django-admin startproject' using Django 1.11.10.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '6$nd^z^&qer5ys4exz&x$d&n1j5&a6ql6@5j2n0*huhx*pylgq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*',]

SITE_ID = 2

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_comments',
    'mptt',
    'tagging',
    'ckeditor',
    'zinnia_extend',
    'zinnia',
    'zinnia_ckeditor',

    'ckeditor_uploader',
    'home',
    'storytellingmap',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'panamsite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates'),],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
'django.template.context_processors.i18n',
'zinnia.context_processors.version',  # Optional
            ],
        },
    },
]

WSGI_APPLICATION = 'panamsite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'panampath2',
        'USER': 'panampath',
        'PASSWORD': 'p@n@mp@th',
        'HOST': 'mysql.panamdev.xyz',
        'PORT': '',
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = False

CKEDITOR_IMAGE_BACKEND = 'pillow'

CKEDITOR_UPLOAD_PATH = ""


ZINNIA_ENTRY_BASE_MODEL = 'zinnia_extend.models.EntryExtend'
MIGRATION_MODULES = {'zinnia': 'zinnia_extend.migrations_zinnia'}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/
#STATIC_ROOT = os.path.join(BASE_DIR, "public/media")
STATICFILES_DIRS = [
os.path.join(BASE_DIR, "public/static"),


]
STATIC_URL = '/static/'
ZINNIA_UPLOAD_TO = "uploads"
MEDIA_ROOT = os.path.join(BASE_DIR, "public/media")
MEDIA_URL = '/media/'
try:
    from local_settings import *
    no_local = False
except ImportError:
    no_local = True
