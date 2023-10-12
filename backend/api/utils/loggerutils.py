import logging as log
import sys

logging=None
def getLogger():
    global logging
    if logging:
        return logging

    file_handler = log.FileHandler(filename="crux.log")
    stdout_handler = log.StreamHandler(stream=sys.stdout)
    handlers = [file_handler, stdout_handler]

    log.basicConfig(level = log.DEBUG,format='[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',handlers=handlers )

    logging=log.getLogger('logger')
    return logging