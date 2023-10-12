import json

def get_config(val):
    return get_config_file_data().get(f"{val}")


def get_config_file_data():
    file = open(f"globalConfig.json", "r")
    config = json.load(file)
    file.close()
    return config


def get_config_vars():
    with open("globalConfig.json") as globalConfigJSON:
        _configVars = json.load(globalConfigJSON)
        return _configVars

