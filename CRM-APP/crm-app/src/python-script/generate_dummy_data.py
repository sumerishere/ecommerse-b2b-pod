import random

import pandas as pd
from faker import Faker

# Initialize Faker
fake = Faker()

# Specify the number of dummy records you want to generate
num_records = 20

# Create a list to hold each row of data
data = []

# Generate dummy data based on specified columns
for _ in range(num_records):
    record = {
        'name': fake.name(),
        'email': fake.email(),
        'mobile_number': fake.phone_number(),
        'address': fake.address(),
        'course_type': random.choice(['Science', 'Arts', 'Commerce', 'Engineering']),
        'source': random.choice(['Website', 'Referral', 'Social Media', 'Event']),
        'refer_name': fake.name(),
        'qualification': random.choice(['High School', 'Bachelor\'s', 'Master\'s']),
        'category': random.choice(['New', 'Returning']),
        'follow_up_date': fake.date_between(start_date='today', end_date='+30d'),
        'assign_to': random.choice(['John Doe', 'Jane Smith', 'Emily Johnson']),
        'status_type': random.choice(['Open', 'Closed', 'Pending'])
    }
    data.append(record)

# Create a DataFrame from the list of records
dummy_data = pd.DataFrame(data)

# Save the generated dummy data to a new Excel file
dummy_data.to_excel('dummy_data.xlsx', index=False)