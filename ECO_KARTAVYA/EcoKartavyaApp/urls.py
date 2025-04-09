# core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('learn/', views.learn, name='learn'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('track/', views.track_view, name='track'),
    path('eco-tips/', views.eco_tips, name='eco-tips'),
    path('achivements/', views.achivements_view, name='achivements'),
    path('profile/', views.profile_view, name='profile'),
    path('redeem/', views.redeem_view, name="redeem"),
    path('community/', views.community, name='community'),

]
