"""EntryAdmin for Zinnia"""
from __future__ import unicode_literals
from zinnia_ckeditor.admin import EntryAdminCKEditor
from zinnia.models.entry import Entry
from zinnia_extend.models import Picture, Gallery
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.db import models
from django import forms
from zinnia.admin.forms import EntryAdminForm
from django.conf import settings

CONFIG_NAME = 'zinnia-content'
CKEDITOR_CONFIG = getattr(settings, 'CKEDITOR_CONFIGS', {})
if CONFIG_NAME not in CKEDITOR_CONFIG:
    CONFIG_NAME = 'default'



class ImageInline(admin.StackedInline):
    model = Picture

class GalleryAdmin(admin.ModelAdmin):
    inlines = [ ImageInline, ]
admin.site.register(Gallery, GalleryAdmin)

class PictureAdmin(admin.ModelAdmin):
    pass
admin.site.register(Picture, PictureAdmin)

class EntryAdminCKEditorForm(EntryAdminForm):
    """
    Define the CKEditor widget for the content field.
    """
    content = forms.CharField(
        label=_('Content'), required=False,
        widget=CKEditorUploadingWidget(config_name=CONFIG_NAME))
    lead = forms.CharField(
            label=_('Lead'), required=False,
            widget=CKEditorUploadingWidget(config_name=CONFIG_NAME))

class EntryExtendAdmin(EntryAdminCKEditor):
    form=EntryAdminCKEditorForm
    fieldsets = (
        (_('Content'), {
            'fields': (('title', 'status'), 'lead', 'content',)}),
        (_('Illustration'), {
            'fields': ('image', 'gallery'),
            'classes': ('collapse', 'collapse-closed')}),) + \
    EntryAdminCKEditor.fieldsets[0:]


admin.site.register(Entry, EntryExtendAdmin)