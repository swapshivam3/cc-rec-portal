# Generated by Django 3.2.5 on 2022-01-28 10:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_alter_candidate_score'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='github',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
