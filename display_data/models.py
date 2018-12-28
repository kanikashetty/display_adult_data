from django.db import models

# Create your models here.
class AdultData(models.Model):
    " Adult datset model "

    age = models.PositiveSmallIntegerField()
    workclass = models.CharField(max_length=100)
    fnlwgt = models.IntegerField()
    education = models.CharField(max_length=100)
    education_num = models.IntegerField()
    marital_status =  models.CharField(max_length=100)
    occupation =  models.CharField(max_length=100)
    relationship =  models.CharField(max_length=100,db_index=True)
    race =  models.CharField(max_length=100,db_index=True)
    sex_choices = [('Male', 'Male'),('Female', 'Female')]
    sex = models.CharField(max_length=10,choices=sex_choices,db_index=True)  
    capital_gain =  models.IntegerField()
    capital_loss = models.IntegerField()
    hours_per_week =  models.IntegerField()
    native_country = models.CharField(max_length=100)
    salary_choices = [('<=50K', '<=50K'), ('>50K', '>50K')]
    salary_per_anum = models.CharField(max_length=100,choices=salary_choices)
    
    def __str__(self):
        return self.relationship