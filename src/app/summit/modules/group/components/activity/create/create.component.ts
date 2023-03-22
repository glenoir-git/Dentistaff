import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActivityModel, Environnment } from 'src/app/entity/activity';
import { TimeWorked } from 'src/app/entity/common';
import { Contract } from 'src/app/entity/contract';
import { Speciality } from 'src/app/entity/speciality';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateActivityComponent {
  activity: ActivityModel | null | undefined;

  envform: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.envform = this.formBuilder.group({
      environment: ['', [Validators.required]]
    });

    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id'] !== "new") {
        //load activity

      } else {
        //create activity form
        this.activity = {
          id: "",
          name: "Nouvelle activité",
          environment: new Array<Environnment>(),
          avaliableContract: Array<Contract>(),
          avaliableTimeWorked: Array<TimeWorked>(),
          avaliableSoftware: Array<string>(),
          avaliableSpeciality: Array<Speciality>(),
          avaliableCertificate: Array<string>(),
        }
      }
    });
  }

  addEnv() {
    console.log(this.envform.value);
    if (this.envform.invalid) {
      console.log("invalid");
      return;
    }

    console.log(this.activity?.environment);
    this.activity!.environment = [...this.activity!.environment, {name: this.envform.value.environment}];
    console.log(this.activity?.environment);
    this.envform.reset();
  }

  deleteEnvFromActivityList(env: Environnment) {
    console.log(env);
    if (confirm("Voulez-vous vraiment supprimer l'environnement " + env.name + " ?")) {
      this.activity!.environment = this.activity!.environment.filter(e => e.name !== env.name);
    }
  }



  updateActivity() {
    //update activity

  }
}
