// where Survey is a Model
// $elemMatch searches for a single record in 'recipients' with matching criteria

Survey.findOne({
    id: surveyId, 
    recipients: {
        $elemMatch: { email: email, responede: false }
    }
})

choice = 'yes' || 'no';

Survey.updateOne({
    id: surveyId, 
    recipients: {
        $elemMatch: { email: email, responede: false }
    }
}, {
    $inc: { [choice]: 1},
    $set: { 'recipients.$.responded': true }
})

// $inc is a mongo operator. it increases either the yes field or the no field by 1
// which puts logic in what we communicate to our database
// [choice] is key interpolation. we don't know at the time whether it will be 'yes' or 'no'
// but we know it wil be one of those and we define that on line 11
// at runtime [choice] resolves to 'yes' or 'no'

// motherfucker, mongo id: is wrong!
// mongo uses _id:
_id: surveyId


// mongo tips
// google and stackoverflow. you already do this.
// do it in node terminal
// again you already do this.