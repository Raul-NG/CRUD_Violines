class Volunteer{
    constructor(_id, _name, _region, _department, _period, _project, _campus, _timeStamp){
        this.id = _id;
        this.name = _name;
        this.region = _region;
        this.department = _department;
        this.period = _period;
        this.project = _project;
        this.campus = _campus;
        this.timeStamp = _timeStamp;

        this.ingressType = "";
        this.institutionalEmail = "";
        this.personalEmail = "";
        this.whatsApp = "";
        this.career = "";
        this.talent = "";
        this.hours = "";
        this.CAG = "";
        this.folder = "";
    }

    show(){
        return [this.id, this.name, this.region, this.department, this.period, this.project, this.campus];
    }
}