/*
* collection helpers
*/
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

/*
* end of collection helpers
*/
/*
* Helper predicates for data
*/
function isNonEmptyLines(transcriptBlock){
    return transcriptBlock.lines.length > 0;
}
function isNonEmptyOCRs(transcriptBlock) {
return transcriptBlock.ocrs.length > 0;
}
function hasFaceData(transcriptBlock) {
    return transcriptBlock.faces.length > 0;
}

/*
* end of helper predicates for data
*/

/*
 * filter functions
 *
*/
function getBlocksWithNonEmptyLines(transcriptBlocks) {
    return filter(transcriptBlocks,isNonEmptyLines);
}
function getBlockWithNonEmptyOCRs(transcriptBlocks) {
    return filter(transcriptBlocks,isNonEmptyOCRs);
}
function getBlocksWithFaces(transcriptBlocks) {
    return filter(transcriptBlocks,hasFaceData);
}
/*
 * end of filter functions
 *
*/
function getTranscriptBlocksData(doc) {
    return doc.insights.transcriptBlocks;
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

function getKeywords(doc) {
    var keywords = [];
    var parsedTopics = topics(doc);
    parsedTopics.forEach(function (t) {
        keywords.push({
            "topicId":t.id,
            "keyword":t.words
        });
    });
    return  keywords;
}

/**
 *
 * @param doc json response
 * @returns returns {Array} of annotation like a dictionary of the following structure
 *  {
 *   "transcriptBlockId" : (number)
 *   "name"              : (string)
 *   "timeRanges"        : [TimeRange]
     "adjustedTimeRanges": [TimeRange]
 *   }
 */
function getAllAnnotations(doc) {
    var rs = [];
    doc.insights.transcriptBlocks.forEach(function (b) {
        b.annotations.forEach(
            function (a) {
                var extractedRangesCommon = [];
                var extractedRangesAdjusted = [];
                a.timeRanges.forEach(function (r) {
                        extractedRangesCommon.push({
                            "start": r.start,
                            "end": r.end
                        });

                    }
                );
                a.adjustedTimeRanges.forEach(function (r) {
                    extractedRangesAdjusted.push({
                        "start": r.start,
                        "end":r.end
                    });
                });
                rs.push(
                    {
                        "transcriptBlockId":b.id,
                        "name": a.name,
                        "timeRanges": extractedRangesCommon,
                        "adjustedTimeRanges": extractedRangesAdjusted
                    }
                );
            }
        )
    })
    return rs;
}
