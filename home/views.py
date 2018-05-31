# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from panampath.models import PathSegment
from pprint import pprint
from forms import EmailForm
from django.conf import settings
from django.shortcuts import render_to_response, render
from django.core.mail.message import EmailMessage


# Create your views here.
class IndexView(TemplateView):
    template_name = 'main.html'

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        segments = PathSegment.objects.all()

        coords = []
        for segment in segments:
            if segment.geom:
                coords.append(segment.geom['coordinates'])
            # for member in segment.geom['coordinates']:
            #     for item in member:
            #         coords.append(item[::-1])

        context["segments"] = segments
        context["coordinates"] = coords

        return context


def send_email(request):

    if request.method != 'POST':
        form = EmailForm()
        return render(request, 'submit_event.html', {'email_form': form})

    form = EmailForm(request.POST, request.FILES)

    if form.is_valid():
        subject = form.cleaned_data['subject']
        message = form.cleaned_data['message']
        email = form.cleaned_data['email']
        attach = request.FILES['attach']
        try:
            mail = EmailMessage(subject, message, settings.EMAIL_HOST_USER, [email])
            mail.attach(attach.name, attach.read(), attach.content_type)
            response = mail.send()
            return render(request, 'submit_event.html', {'message': 'Sent email to %s' % (email)})
        except Exception as e:
            return render(request, 'submit_event.html', {'message': e.message})
    else:
        try:
            return render(request, 'submit_event.html', {'message': form.message})

        except AttributeError:
            return render(request, 'submit_event.html', {'message': "Please fill out all fields on the form.", "email_form":form})


    #return render(request, 'submit_event.html', {'message': 'Unable to send email. Please try again later'})
