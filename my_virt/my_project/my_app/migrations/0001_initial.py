# Generated by Django 4.2.16 on 2024-12-17 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_name', models.CharField(max_length=255)),
                ('score', models.IntegerField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
