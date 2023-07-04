class Notice:
    @staticmethod
    def create_error_notice(message):
        data = {"error": message}
        return data

    @staticmethod
    def create_info_notice(message):
        data = {"info": message}
        return data
