"""panamsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from home.views import IndexView, send_email
from panampath.views import MapView
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from djgeojson.views import GeoJSONLayerView

from panampath.models import PathSegment

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', IndexView.as_view(), name="home"),
    url(r'^submit-event/$', send_email, name="submit_event"),
    url(r'^map/', MapView.as_view(), name="map"),
    url(r'^story/', TemplateView.as_view(template_name='story.html')),
    url(r'^blog/', include('zinnia.urls')),
    url(r'^comments/', include('django_comments.urls')),
    url(r'^ckeditor/', include('ckeditor_uploader.urls')),
    url(r'^data.geojson$', GeoJSONLayerView.as_view(model=PathSegment, properties=('title', 'description', 'picture_url')), name='data')

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


