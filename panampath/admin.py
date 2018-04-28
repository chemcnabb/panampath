from leaflet.admin import LeafletGeoAdmin
from django.contrib import admin
from django.db import models
from . import models as mushrooms_models
from ckeditor_uploader.widgets import CKEditorUploadingWidget

class PathAdmin(LeafletGeoAdmin):

    formfield_overrides = {
        models.TextField: {'widget': CKEditorUploadingWidget}
    }


admin.site.register(mushrooms_models.PathSegment, PathAdmin)
