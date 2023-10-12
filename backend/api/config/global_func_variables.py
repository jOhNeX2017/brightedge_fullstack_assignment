from utils import loggerutils

class InitialValues:

    def __init__(self):
        self.statusCode = 200
        self.error = None
        self.OUTpayload = {}
        self.INpayload = None
        self.logger = loggerutils.getLogger()

    # @classmethod
    def reset(self):
        self.statusCode = 200
        self.error = None
        self.OUTpayload = {}
        self.INpayload = None
        self.logger = loggerutils.getLogger()
