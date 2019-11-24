const fs = require('fs')

function block( label, value ) {
    return '\t\t<'+ label + '>' + value + '</'+ label + '>\n'
}

function generate () {
    let contest = JSON.parse( fs.readFileSync( 'config.json' ) )
    let teams = {}
    let problems = {}
    let ans = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    ans += "<contest>\n"
    ans += '\n'
    ans += '\n'
    ans += "\t<info>\n"
    ans += block( "contest-id", contest["info"]["contest-id"] )
    ans += block( "length", contest["info"]["length"] )
    ans += block( "scoreboard-freeze-length", contest["info"]["scoreboard-freeze-length"] )
    ans += block( "penalty", contest["info"]["penalty"] )
    ans += block( "title", contest["info"]["title"] )
    ans += block( "short-title", contest["info"]["short-title"] )
    ans += "\t</info>\n"
    ans += '\n'
    ans += '\n'
    contest["language"].forEach(element => {
        ans += "\t<language>\n"
        ans += block( "id", element["id"] )
        ans += block( "name", element["name"] )
        ans += "\t</language>\n"
    });
    ans += '\n'
    ans += '\n'
    contest["region"].forEach(element => {
        ans += "\t<region>\n"
        ans += block( "external-id", element["external-id"] )
        ans += block( "name", element["name"] )
        ans += "\t</region>\n"
    });
    ans += '\n'
    ans += '\n'
    contest["judgement"].forEach(element => {
        ans += "\t<judgement>\n"
        ans += block( "acronym", element["acronym"] )
        ans += block( "name", element["name"] )
        ans += "\t</judgement>\n"
    });
    ans += '\n'
    ans += '\n'
    contest["problem"].forEach(element => {
        ans += "\t<problem>\n"
        problems[ element["name"] ] = element["id"]
        ans += block( "id", element["id"] )
        ans += block( "label", element["label"] )
        ans += block( "name", element["name"] )
        ans += "\t</problem>\n"
    });
    ans += '\n'
    ans += '\n'
    contest["team"].forEach(element => {
        ans += "\t<team>\n"
        teams[element["name"]] = element["id"]
        ans += block( "id", element["id"] )
        ans += block( "name", element["name"] )
        ans += block( "nationality", element["nationality"] )
        ans += block( "university", element["university"] )
        ans += block( "region", element["region"] )
        ans += block( "external-id", element["external-id"] )
        ans += "\t</team>\n"
    });
    ans += '\n'
    ans += '\n'
    let data = JSON.parse( fs.readFileSync( 'data.json' ) )
    let config = JSON.parse( fs.readFileSync( '../config.json' ) )
    let submitions = []
    data.forEach(element => {
        if( config["teams"].hasOwnProperty( element[1] ) && 
                teams.hasOwnProperty( config["teams"][element[1]] )) {
            let temp = {}
            temp["id"] = element[2]
            temp["solved"] = element[6] === "1"
            temp["problem"] = problems[ element[0] ]
            temp["team"] = teams[ config["teams"][element[1]] ]
            temp["time"] = parseInt( element[4] )*60
            submitions.push( temp )
        }
    });
    submitions.forEach(element => {
        ans += "\t<run>\n"
        ans += block( "id", element["id"] )
        ans += block( "judged", "True" )
        ans += block( "penalty", !element["solved"]? "True" : "False" )
        ans += block( "problem", element["problem"] )
        ans += block( "result", element["solved"]? "AC" : "WA" )
        ans += block( "solved", element["solved"]? "True" : "False" )
        ans += block( "team", element["team"] )
        ans += block( "time", element["time"] )
        ans += "\t</run>\n"
    });
    ans += '\n'
    ans += '\n'
    ans += "\t<finalized>\n"
    ans += block( "last-gold", contest["finalized"]["last-gold"] )
    ans += block( "last-silver", contest["finalized"]["last-silver"] )
    ans += block( "last-bronze", contest["finalized"]["last-bronze"] )
    ans += block( "comment", contest["finalized"]["comment"] )
    ans += "\t</finalized>\n"
    ans += '\n'
    ans += '\n'
    ans += "</contest>\n"
    fs.writeFileSync('output.xml', ans )
}

generate()