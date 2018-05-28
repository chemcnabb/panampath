from django import forms

class EmailForm(forms.Form):
    email = forms.EmailField()
    subject = forms.CharField(max_length=100)
    attach = forms.Field(widget = forms.FileInput)
    message = forms.CharField(widget = forms.Textarea)