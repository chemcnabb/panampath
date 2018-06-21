# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.flatpages.admin import FlatPageAdmin
from django.contrib.flatpages.models import FlatPage
from django.db import models

from ckeditor_uploader.widgets import CKEditorUploadingWidget

class FlatPageCustom(FlatPageAdmin):
    formfield_overrides = {
        models.TextField: {'widget': CKEditorUploadingWidget}
    }

admin.site.unregister(FlatPage)
admin.site.register(FlatPage, FlatPageCustom)




from django.conf.urls import url
from django.contrib import admin
try:
    from django.urls import reverse
except ImportError:
    from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from .models import FileBrowser



class FileBrowserAdmin(admin.ModelAdmin):
    actions = []

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_urls(self):
        opts = self.model._meta
        info = opts.app_label, (opts.model_name if hasattr(opts, 'model_name') else opts.module_name)
        return [
            url('^$', self.admin_site.admin_view(self.filebrowser_view), name='{0}_{1}_changelist'.format(*info)),
        ]

    def filebrowser_view(self, request):
        return HttpResponseRedirect(reverse('filebrowser:fb_browse'))



#admin.site.register(FileBrowser, FileBrowserAdmin)