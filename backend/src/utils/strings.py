import random
import string


def query_params_to_list(query_params_string: str) -> list:
    return list(map(int, query_params_string.strip().strip(",").split(",")))


def make_random_string(length: int = 10) -> str:
    return "".join(random.choices(string.ascii_uppercase + string.digits, k=length))
