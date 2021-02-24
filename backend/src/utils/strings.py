def query_params_to_list(query_params_string: str) -> list:
    return list(map(int, query_params_string.strip().strip(",").split(",")))
