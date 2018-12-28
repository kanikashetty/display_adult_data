from django.shortcuts import render
from django.http import HttpResponseRedirect,HttpResponse
from .models import AdultData
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT
from django.views.decorators.cache import cache_page
from django.contrib import messages

import logging
import json

logger = logging.getLogger(__name__)

"cache page expires for every 5 minutes"
@cache_page(60*5)
def charts(request):
    
    "View for displaying the data in charts"
    try:
        male_count =  AdultData.objects.filter(sex='Male').count()
        female_count =  AdultData.objects.filter(sex='Female').count()
        relation = AdultData.objects.values('relationship').distinct()
        
        "converting queryset to list"
        relation_list = [i['relationship'] for i in relation]
        relation_dict = {}
        for r in relation_list:
            relation_dict[r] = AdultData.objects.filter(relationship=r).count()
           
        context={"male_count" : male_count, "female_count" : female_count}
        context.update({"relationship" : relation_dict})   
        print(context)          
        return render(request,'display_data/charts.html',context=context)
    except Exception as e :
        messages.error(request,'Something went wrong!')
        logger.error(e)
        if context:
            return render(request,'display_data/charts.html',context=context)
        else:
            return render(request,'display_data/charts.html')

"cache page expires for every 5 min"
@cache_page(60*5)
def details(request):
    "View to dislay each row of the adultdata and also to display the filtered result"
    try:
        if request.method=="POST":
            
            "accessing the ajax request sent by datatable"
            ajax_data = request.POST
            draw = int(ajax_data.get('draw'))
            length = int(ajax_data.get('length'))
            adult_data = AdultData.objects.all()
            records_total = adult_data.count()
            
            "Specific data for the selected filter"
            if (ajax_data.get('column_name') and ajax_data.get('filter')):
                column_name = ajax_data.get('column_name')
                filter_by = ajax_data.get('filter')
                if column_name == 'relationship':
                    adult_data = AdultData.objects.filter(relationship=filter_by)
                    records_total =  adult_data.count()
                elif column_name == 'race':
                    adult_data = AdultData.objects.filter(race=filter_by)
                    records_total =  adult_data.count()
                elif column_name == 'sex':
                    adult_data = AdultData.objects.filter(sex=filter_by)
                    records_total =  adult_data.count()
            
            records_filtered = records_total
            "create django pagination"
            paginator = Paginator(adult_data, length)

            try:
                object_list = paginator.page(draw).object_list
            except PageNotAnInteger:
                object_list = paginator.page(draw).object_list
            except EmptyPage:
                object_list = paginator.page(paginator.num_pages).object_list
               
            "Data to be sent to datatables"
            data = [
			            { "age":  adult.age,
                         "workclass": adult.workclass ,
                         "fnlwgt": adult.fnlwgt ,
                         "education": adult.education,
                         "education_num": adult.education_num ,
                         "marital_status": adult.marital_status ,
                         "occupation": adult.occupation ,
                         "relationship": adult.relationship ,
                         "race": adult.race ,
                         "sex": adult.sex ,
                         "capital_gain": adult.capital_gain ,
                         "capital_loss": adult.capital_loss ,
                         "native_country": adult.native_country ,
                         "salary_per_anum": adult.salary_per_anum }for adult in object_list
		                ]
            return_data = {
                'draw': draw,
                'recordsTotal': records_total,
                'recordsFiltered': records_filtered,
                'data': data,
            }
            return HttpResponse(json.dumps(return_data), 'application/json')
        
        if request.method == "GET":
            relation = AdultData.objects.values('relationship').distinct()
            relation_list = [i['relationship'] for i in relation]
            race = AdultData.objects.values('race').distinct()
            race_list = [i['race'] for i in race]
            sex =  AdultData.objects.values('sex').distinct()
            sex_list = [i['sex'] for i in sex]
            return render(request,'display_data/details.html',context={'relation':relation_list, 'race':race_list, 'sex':sex_list})
    except Exception as e :
        messages.error(request,'Something went wrong!')
        logger.error(e)
        return render(request,'display_data/details.html')

       