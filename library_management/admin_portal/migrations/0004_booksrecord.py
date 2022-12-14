# Generated by Django 4.1.1 on 2022-09-19 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('admin_portal', '0003_delete_booksrecord'),
    ]

    operations = [
        migrations.CreateModel(
            name='BooksRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('image', models.ImageField(blank=True, null=True, upload_to='books')),
                ('author', models.CharField(max_length=30)),
                ('type', models.CharField(choices=[('story', 'story'), ('poety', 'poety'), ('noval', 'noval'), ('autobiographies', 'autobiographies')], max_length=30)),
                ('discriptions', models.TextField(max_length=300)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
