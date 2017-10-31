function map(collection,func) {
	var rc = []
	collection.forEach(function(i){rc.push(f(i));});
	return rc;
}
function filter(collection,predicate){
	var rc = []
	collection.forEach(function(i){
		if(predicate(i)) {
			rc.push(i);
		}
	});
	return rc;
}
function getAudioEffectCategories(doc){
	var rs = [];
	doc.insights.audioEffectsCategories.forEach(function(c){
		rs.push({"key":c.key,"type":c.type});
    });
	return rs;
}

function getAllParticipants(doc) {
	var rs = [];
	doc.insights.participants.forEach(function (c) {
        rs.push({"id":c.id,"name":c.name,"pictureUrl":c.pictureUrl});
	});
	return rs;
}

function getFaces(doc) {
	var rs = [];
	doc.insights.faces.forEach(function(f){rs.push(
		{
		"id":f.id,
		"bingId":f.bingId,
		"confidence":f.confidence,
		"description":f.description,
		"imageUrl":f.imageUrl,
		"knownPersonId":f.knownPersonId,
		"name":f.name,
		"thumbnailId":f.thumbnailId,
		"title":f.title});
	});
	return rs;
}

function topics(doc) {
	var rs = [];
	doc.insights.topics.forEach(function (t) {
        rs.push({
            "id": t.id,
            "name": t.name,
            "stem": t.stem,
            "rank": t.rank,
            "words": t.words
        })
    });
	return rs;
}

function getWordsFromTopic(topic) {
	var obj = [];
	return topic.words[0].split(" ");
}