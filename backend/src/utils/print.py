import json


def pprint(payload):
    """
    pretty print json payload
    """
    return print(json.dumps(payload, indent=4, sort_keys=True))
