import { Component, OnInit } from '@angular/core';

import { DataService } from '../data.service';
import { AgentsStates, QItem, QueuesState } from '../interfaces';

/*This is to read the settings from our conf file */
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  agentsStateDb: any[] = [];
  agentsStateDbcnv!: AgentsStates;

  //Reference values for 3x circles
  anF: number = 30; //Answer filled
  anE: number = 70; //Answer empty
  cwF: number = 30; //calls waiting filled
  cwE: number = 70; //calls waiting empty
  abF: number = 30; //Abandoned filled
  abE: number = 70; //Abandoned empty

  //Reference values for bar percentages
  avIdle: number = 25;
  avAcd: number = 25;
  avNonAcd: number = 25;
  avUn: number = 25;

  //service level color
  slc: string = "#fc0303";

  //View agent test
  agentDetails: number = 0;
  agentShow: boolean = false;


  queuesStateDb: any[] = [];
  queuesStateDbcnv!: QueuesState;
  q!: QItem[];


  constructor(
    private dataService: DataService,
    private config: AppConfig,
  ) {}

  aQ: number = this.config.getConfig().activeQ; //active Queue chosen to view. Default is zero
  answP: boolean = this.config.getConfig().answeredAsPercent || false; //Answered calls as percent (true) or actual number (false)
  abndP: boolean = this.config.getConfig().abandonedAsPercent || false; //Abandoned calls as percent (true) or actual number (false)

  ngOnInit(): void {
    this.agentsState();
    this.queuesState();
  }

  agentsState() {
    this.dataService.getAgentsState().subscribe(
      aData => this.agentsStatesDestructure(aData),
      () => console.error("Error getting agents states"),
      //No "complete" available, because of timer on service
    );
    }

    agentsStatesDestructure(d :any[]) {
      //Destructure: https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
      this.agentsStateDb = d;
      const mkUnknwn = <unknown> this.agentsStateDb;
      this.agentsStateDbcnv = <AgentsStates> mkUnknwn; //Type asserting: any -> unknown -> AgentsStates
      
      //Destructuring example:
      //https://www.typescriptlang.org/docs/handbook/variable-declarations.html#object-destructuring
      //let { count }: { count: number; } = this.agentsStateDbcnv;
      //alert("There are so many entries: " + count);
    }


    queuesState() {
      this.dataService.getQueuesState().subscribe(
        qData => this.queuesStatesDestructure(qData),
        () => console.error("Error getting queue states"),
      );
    }
    
    queuesStatesDestructure(q :any[]) {
      this.queuesStateDb = q;
      const mkUnknwn = <unknown> this.queuesStateDb;
      this.queuesStateDbcnv = <QueuesState> mkUnknwn;

      //Update q as well
      this.q = this.queuesStateDbcnv._embedded.items;

      //Update 3 dials
      this.threePercents();

      //Update bar chart
      this.barChart();

      //Set service level color
      this.sLevel();
      
      //Destructuring example:
      //let { count }: { count: number; } = this.queuesStateDbcnv;
      //alert("There are so many entries: " + count);
    }

    threePercents(){
      var ab = this.q[this.aQ].abandonedConversationsToday;
      var cw = this.q[this.aQ].waitingConversations;
      var offered = this.q[this.aQ].offeredConversationsToday;
      
      var abP = ab / offered * 100; //abandon percent
      var anP = 100 - abP; //answered
      
      this.abF = abP;
      this.abE = 100 - abP;

      //Threshold: 3 waiting calls per available agent
      var agents = this.q[this.aQ].agentsAvailable;
      var cwThresh = 3 * agents;
      this.cwF = cw / cwThresh * 100;
      this.cwE = 100 - this.cwF;

      this.anF = anP;
      this.anE = 100-anP
    }

    //Bar chart
    barChart(){
      var total = this.q[this.aQ].agentsIdle + this.q[this.aQ].agentsOnAcdConversations + this.q[this.aQ].agentsOnNonAcdConversations + this.q[this.aQ].agentsUnavailable;
      this.avIdle = this.q[this.aQ].agentsIdle / total * 100;
      this.avAcd = this.q[this.aQ].agentsOnAcdConversations / total * 100;
      this.avNonAcd = this.q[this.aQ].agentsOnNonAcdConversations / total * 100;
      this.avUn = this.q[this.aQ].agentsUnavailable / total * 100;
    }

    //Service level color
    sLevel(){
      let val = this.q[this.aQ].serviceLevelPercentageToday;
      switch(true){
        case (val >= 80):
          this.slc = "#29f725"; //Neon green
          break;
        case (val >= 60):
          this.slc = "#fcba03"; //Neon orange
          break;
        default:
          this.slc = "#fc0303"; //Red
          break;
      }
    }

    //Select other Queue's stats
    qSelect(q: number){
      this.aQ = q;
    }

    //View as percent or not
    vSelectP(t: boolean, a: string){
      if (a == "all"){
        this.answP = t;
        this.abndP = t;
      }
      else if (a == "answP") {
        this.answP = t;
      }
      else if (a == "abndP") {
        this.abndP = t;
      }
    }

    //agentDetails
    setAgentDetails(a: number) {
      this.agentDetails = a;
      this.agentShow = true;
    }      
    

}
