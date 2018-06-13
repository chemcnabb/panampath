from django import forms

from .models import EntryExtend
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class EntryExtendForm(forms.ModelForm):

    class Meta:
        model = EntryExtend
        widgets = {
            'lead': CKEditorUploadingWidget,
        }