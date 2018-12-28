from django.urls import path,re_path
from . import views

urlpatterns = [
    path('',views.charts, name='charts'),
    re_path(r'^details/$',views.details, name='details'),
    
]