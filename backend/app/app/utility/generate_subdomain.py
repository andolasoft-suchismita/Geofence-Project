import re


def generateSubDomain(email):
    # Extract the domain part after '@'
    domain_part = email.split('@')[1]  # "andolasoft.us"

    # Extract only the main domain name (remove TLD like .us, .com)
    domain_name = domain_part.split('.')[0]  # "andolasoft"

    return domain_name