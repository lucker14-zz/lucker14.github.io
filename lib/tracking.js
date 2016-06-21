var ADROLL_TRACKED_EVENTS = {
	video_watch: '5c73610e',
}

function adroll_track(event_type) {
	var event_id = ADROLL_TRACKED_EVENTS[event_type];
	if (event_id) {
		try {
			__adroll.record_user({"adroll_segments": event_id});
		} catch(err) {}
	} else {
		console.log('adroll_track: invalid parametr "event_id"');
	}
}