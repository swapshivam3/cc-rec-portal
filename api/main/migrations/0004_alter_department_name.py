# Generated by Django 3.2.5 on 2022-01-22 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_department_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='name',
            field=models.CharField(choices=[('cp', 'Competetive Programming'), ('fe', 'Frontend Web Development'), ('be', 'Backend Web Development'), ('ap', 'App Development'), ('ui', 'UI/UX'), ('gd', 'Game Development'), ('vi', 'Video Editing'), ('gr', 'Graphic Design')], max_length=2, primary_key=True, serialize=False),
        ),
    ]