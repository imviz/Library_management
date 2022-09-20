from distutils.command.upload import upload
from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager


# customizing auth user model using baseusermanger inheritance

class MyAccountManager(BaseUserManager):
        
    # we can also used to create user profile also
    def create_user(self,name,username,email,password=None):
        if not email:
            raise ValueError('you must have email addresse')
        user=self.model(
            email=self.normalize_email(email),
            name=name,
            username=username,                  
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    
    def create_superuser(self,name,username,email,password):
        user=self.create_user( 
            email=self.normalize_email(email),
            name=name,
            username=username,
            password=password,
        
            )
        user.is_admin=True
        user.is_staff=True
        user.is_active=True
        user.is_superuser=True
        user.save(using=self._db)
        return user
        
# admin table  
class Account(AbstractBaseUser):
    name=models.CharField(max_length=20)
    username=models.CharField(max_length=20)
    email=models.EmailField(max_length=30,unique=True)
    date_joined=models.DateField(auto_now_add=True)
    last_login=models.DateField(auto_now_add=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
  
    
    # change the username field to email for the login
    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','username',]   
    
    objects=MyAccountManager()
    
    def __str__(self):
        return self.email
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    
    
    def has_module_perms(self,add_label):
        return True
    
    
    
# for books records

class BooksRecord(models.Model):
    # its a choice for type /we can do it as a new model 
    TYPE_OF_BOOK=(
        ('story','story'),
        ('poety','poety'),
        ('noval','noval'),
        ('autobiographies','autobiographies'),     
        
    )
    name=models.CharField(max_length=30)
    image=models.ImageField(upload_to='books',null=True,blank=True)
    author=models.CharField(max_length=30)
    type=models.CharField(choices=TYPE_OF_BOOK, max_length=30)
    discriptions=models.TextField(max_length=300)
    create_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.name
    
