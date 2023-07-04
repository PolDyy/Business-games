export default function createNoticeWebsocket(notice, noticeService) {
	if (notice) {
		if (notice.info) {
			noticeService.addInfoNotice(notice.info)
		}
		if (notice.error) {
			noticeService.addErrorNotice(notice.error)
		}
	}
}
