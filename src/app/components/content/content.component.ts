import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  summaryFormGroup: FormGroup;
  categorySelected: string = null;
  SubCategorySelected: string = null;
  type:string=null;
  SubCategories: any = null;
  eventType: string = null;
  frequencySelected: string = null;
  frequencyFilter: any = null;
  occuranceSelected: string = null;
  StartDate: string;
  EndDate: string;
  minDate: Date;
  startTime: string;
  endTime:string;
  fileToUpload: any;
  imageUrl: any;
  urls = [];
  guesturl =[];
  locationselected: string = null;
  cityvenues: any = []
  venueselected: string = null;
  prices: number = 0;
  price: boolean = false;
  ticketnameerror: boolean = false;
  guests: number = 0;
  authorityerror: boolean = true;
  authorityselected: string = "";


  constructor(private _formBuilder: FormBuilder) {
    this.minDate = new Date();
  }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      typecontrol: new FormControl('', [Validators.required]),
      frequencycontrol: ['', Validators.required],
      occurancecontrol: ['', Validators.required],
      titlecontrol: ['', Validators.required],
      informationcontrol: ['', Validators.required],
      timecontrol: ['', Validators.required],
      datecontrol: ['', Validators.required],
      imagecontrol: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      addresscontrol: ['', Validators.required],
      locationcontrol: ['', Validators.required],
      venuecontrol: ['', Validators.required],
      pricecontrol: new FormControl('',[Validators.required]),

    });
    this.thirdFormGroup = this._formBuilder.group({
      radiobuttoncontrol: new FormControl('',[Validators.required]),
      authoritycontrol:new FormControl('',[Validators.required]),
      additionalinfocontrol: ['', Validators.required],
    });
  }



  EventCategories: { category: string, icon: string, subCategory: string[] }[] = [
    { "category": "Music", "icon": "music_note",
    "subCategory":['Alternative Music', 'Blues', 'Classical Music', 'Country Music', 'Dance Music','Trance Music']},

    { "category": "Food & Drink", "icon": "restaurant_menu",
    "subCategory":['Vegetables', 'Dairy', 'Meat & Fish ', 'Whole grains', 'Beverages', 'Non-dairy'] },

    { "category": "Arts & Culture", "icon": "art_track",
    "subCategory":['Sculpture', 'Graphic', 'Poster', 'Drawing', 'Painting‎', 'Literature & Music'] },

    { "category": "Parties & Nightlife", "icon": "party_mode",
    "subCategory":['Birthday party', 'Dinner party', 'Cocktail party', 'Garden party', 'Banquets party','Bachelor party'] },

    { "category": "Sports & Wellness", "icon": "accessibility",
    "subCategory":['Football', 'Basketball', 'Hockey‎', 'Cricket‎', 'Surfing‎', 'Extreme Sports‎'] },

    { "category": "Networking & Classes", "icon": "laptop",
    "subCategory":['Virtual groups', 'Career fairs', 'Conferences', 'Community', 'Industry-specific','Seminar'] }
  ];

  get firstform(){
    return this.firstFormGroup.controls;
  }

  get secondform() {
    return this.secondFormGroup.controls;
  }

  get thirdform() {
    return this.thirdFormGroup.controls;
  }



  // event category
  chooseCategory(category: string){
    this.categorySelected = category;
    console.log(this.categorySelected);
    this.SubCategories = this.EventCategories.filter(
      event => event.category == this.categorySelected);
    console.log(this.SubCategories);
  }

  chooseSubCategory(subcategory: string){
    this.SubCategorySelected = subcategory;
    console.log(this.SubCategorySelected);
  }

  // event chosen
  EventChosen(type: string){
    this.eventType = type;
    console.log(this.eventType);
  }

  frequency: any = [
    {value: 'Daily', viewValue: 'Daily',"occurance":['Daily']},
    {value: 'Weekly', viewValue: 'Weekly',"occurance":['Monday', 'Tuesday', 'Wesnesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']},
    {value: 'Monthly', viewValue: 'Monthly',"occurance":['10 days', '20 days', '30 days']},
    {value: 'Yearly', viewValue: 'Yearly',"occurance":['January', 'February', 'March', 'April', 'May', 'June', 'September','October','November','December']}
  ];

// event frequency
  eventfrequency(event){
    if(event.isUserInput){
      this.frequencySelected = event.source.viewValue;
      console.log(this.frequencySelected);
      this.frequencyFilter = this.frequency.filter(
        event => event.viewValue == this.frequencySelected);
      console.log(this.frequencyFilter);
    }
  }

  periodfrequency(event){
    if(event.isUserInput){
      this.occuranceSelected = event.source.viewValue;
      console.log(this.occuranceSelected);
    }
  }

  // date for event
  startDate(event) {
    this.StartDate = event.value;
    console.log(this.StartDate)
  }

  endDate(event) {
    this.EndDate = event.value;
    console.log(this.EndDate)
  }

  // starting and ending time for event
  startingTime(time: string){
    this.startTime = time;
    console.log(this.startTime);
  }

  EndingTime(time: string){
    this.endTime = time;
    console.log(this.endTime);
  }


  // allow upload of multiple images for event
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event:any) => {
          console.log(event.target.result);
          this.urls.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
    console.log(this.urls.length);
  }

  //Show image preview
  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  // end of page one
  Page1Proceed(stepper: MatStepper){
    if (this.firstform.frequencycontrol.value == '' ||
      this.firstform.occurancecontrol.value == '' ||
      this.firstform.informationcontrol.value == '' ||
      this.firstform.typecontrol.value =='' ||
      this.firstform.datecontrol.value == '' ||
      this.firstform.titlecontrol.value == '' ||
      this.firstform.timecontrol.value == '' ||
      this.urls.length==0) {
      alert("Fill in the form properly");
    } else {
      stepper.next();
    }
  }


 //location and venue
  cities: { name: string, venues: string[] }[] = [
    {"name": "Rose hill", "venues":['Openground','Underground','Open-Air']},
    {"name": "Q.Bornes", "venues":['Openground','Underground','Open-Air']},
    {"name": "Souillac", "venues":['Openground','Underground','Open-Air']}];

  chooseLocation(event){
    if(event.isUserInput){
      this.locationselected = event.source.value;
      console.log(this.locationselected);
      this.cityvenues = this.cities.filter(
        event => event.name == this.locationselected);
      console.log(this.cityvenues);
    }
  }

  chooseVenue(event){
    if(event.isUserInput){
      this.venueselected = event.source.value;
      console.log(this.venueselected);
    }
  }

  // pricing
  priceinformation: {index: number, ticketName: string, price: number}[] = [];

  ChoosePrice(){
    if (this.secondform.pricecontrol.value=='Free') {
      this.prices = 0;
      this.priceinformation = [];
      this.ticketnameerror=false;
    }
    else if (this.secondform.pricecontrol.value=='Paid'){
      this.prices = 1;
      this.priceinformation = [];
      const items: any = [];
      items.index = 0;
      items.ticketName = "";
      items.price = 0;
      this.priceinformation.push(items);
      this.ticketnameerror = true;
    }
    console.log(this.prices);
    console.log(this.priceinformation);
  }



    minimumprice = 0;
    UpdatePrice(operation: string){
    if (operation == "-") {
      if (this.prices == this.minimumprice) {
        this.ticketnameerror = true;
      } else {
        this.prices = this.prices -1;
        this.priceinformation.pop();
      }
    } else if (operation == "+") {
      this.prices = this.prices +1;
      const items: any = [];
      items.index = this.priceinformation.length;
      items.ticketName = "";
      items.price = 0;
      console.log(items);
      this.priceinformation.push(items);
      this.ticketnameerror = true;
    }
    console.log(this.prices);
    console.log(this.priceinformation);
  }

  getTicketName(event: any, item){
    let name: string = "";
    name = event.target.value;
    console.log(name);
    if (name.trim() == "") {
      this.ticketnameerror = true;
    } else {
      this.ticketnameerror = false;
      let index = this.priceinformation.indexOf(item);
      item.ticketName = name.trim();
      this.priceinformation[index] = item;
      console.log(this.priceinformation);
    }
  }


  ticketpricerror:boolean= false;
  getPrice(event: any, item){
    let priceselected: number = Number(event.target.value);
    let index = this.priceinformation.indexOf(item);
    item.price = priceselected;
    if (isNaN(priceselected)){
      this.ticketpricerror = true;
      console.log("Not a number")
    } else {
      this.ticketpricerror = false;
    this.priceinformation[index] = item;
    console.log(this.priceinformation);
     }
  }

  // end of page two
  Page2Proceed(stepper: MatStepper){
      if (
        this.secondform.addresscontrol.value =='' ||
        this.secondform.locationcontrol.value =='' ||
        this.secondform.venuecontrol.value =='' ||
        this.secondform.pricecontrol.value =='' ||
        this.ticketnameerror == true || this.ticketpricerror == true ) {
      alert("Fill in the form properly");
      } else {
        stepper.next();
      }
    }


  EventRestrictions: string[] = ['None', 'Children Only', 'Women Only', 'No children', "Event 18 +", "Senior Citizen"];

  restrictionselected: string = "";

  changeRestrictions(event){
    this.restrictionselected = event.source.value;
    console.log("Restriction selected:" + " " + this.restrictionselected)
  }


  guestserror: boolean = false;
  minimumguests = 0;
  UpdateGuests(operation: string){
    if (operation == "-") {
      if (this.guests == this.minimumguests) {
        this.guestserror=true;
      } else {
        this.guests = this.guests -1;
      }
    } else if (operation == "+") {
      this.guests = this.guests +1;
    }
    this.guestserror = false;
    console.log(this.guests);
  }


  specialguestsnumber: number = 1;
  minimumspecialguests = 0;
  SpecialGuests: {index: number, name: string}[] = [{index:1, name: ""}];
  UpdateSpecialGuests(operation: string){
    if (operation == "-") {
      if (this.specialguestsnumber == this.minimumguests) {
        this.specialguestserror = false;
      } else {
        this.specialguestsnumber = this.specialguestsnumber -1;
        this.SpecialGuests.pop();
      }
    } else if (operation == "+") {
      this.specialguestsnumber = this.specialguestsnumber +1;
      const specialguestsdetails: any = [];
      specialguestsdetails.index = this.SpecialGuests.length;
      specialguestsdetails.name = "";
      console.log(specialguestsdetails);
      this.SpecialGuests.push(specialguestsdetails);
      this.specialguestserror = true;
    }
    console.log(this.SpecialGuests);
  }


  specialguestserror: boolean = true;
  SpecialGuestsDetails(event, guest){
    let form3NameSelected: string = "";
    form3NameSelected = event.target.value;
    console.log(form3NameSelected);
    if (form3NameSelected.trim() == "") {
      this.specialguestserror = true;
    } else {
      this.specialguestserror = false;
      let index = this.SpecialGuests.indexOf(guest);
      guest.name = form3NameSelected.trim();
      this.SpecialGuests[index] = guest;
      console.log(this.SpecialGuests);
    }
  }

  // allow upload of multiple images for event
  GuestsImage(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = (event:any) => {
          console.log(event.target.result);
          this.guesturl.push(event.target.result);
          }
          reader.readAsDataURL(event.target.files[i]);
        }
    }
    console.log(this.guesturl.length);
  }

  //Show image preview
  handleGuestImage(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  // authority
  authorities: string[] = ['Police','Traffic Control'];

  selectAuthority(){
    if (this.thirdform.authoritycontrol.value=='No') {
      this.authorityselected = "";
      this.authorityerror = false;
    } else if (this.thirdform.authoritycontrol.value=='Yes'){
      this.authorityerror = true;
    }
  }

  changeAuthority(event){
    this.authorityselected = event.source.value;
    this.authorityerror = false;
    console.log("Authority selected:" + " " + this.authorityselected);
  }

  // end of page three
  Page3Proceed(stepper: MatStepper){
   if (this.thirdform.radiobuttoncontrol.value == null ||
    this.guestserror == true ||
    this.guests < 1 || this.thirdform.additionalinfocontrol.value ==''||
    this.specialguestserror == true ||
    this.authorityerror == true ||
    this.thirdform.authoritycontrol.value =='') {
     alert("Fill in the form properly")
    } else {
      stepper.next();
      alert("Event created")
    }
  }

}
