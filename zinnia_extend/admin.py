"""EntryAdmin for Zinnia"""
from __future__ import unicode_literals
from zinnia_ckeditor.admin import EntryAdminCKEditor
from zinnia.models.entry import Entry
from zinnia_extend.models import Picture, Gallery
from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

class PictureAdmin(admin.ModelAdmin):
    pass
admin.site.register(Picture, PictureAdmin)
class GalleryAdmin(admin.ModelAdmin):
    pass
admin.site.register(Gallery, GalleryAdmin)

class EntryExtendAdmin(EntryAdminCKEditor):
    fieldsets = (
        (_('Content'), {
            'fields': (('title', 'status'), 'lead', 'content',)}),
        (_('Illustration'), {
            'fields': ('image', 'gallery'),
            'classes': ('collapse', 'collapse-closed')}),) + \
    EntryAdminCKEditor.fieldsets[2:]

admin.site.register(Entry, EntryExtendAdmin)