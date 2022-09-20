from django.urls import path,include
from .import views
from rest_framework.routers import DefaultRouter
from .views import *

# simple jwt token specifications
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# for viewset router setup
router = DefaultRouter()
router.register('books',BookRecordViewSet,basename='books')
router.register('studentpage',BookRecordViewSetForStudent,basename='studentpage')

urlpatterns = [    
               
  # for registration
    path('register/',views.admin_register,name='admin_register'),
    
    #  for admin login with token 
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # for refresh token setup
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
]+router.urls