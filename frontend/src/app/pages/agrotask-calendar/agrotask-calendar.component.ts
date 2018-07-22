import {Component} from "@angular/core";
import {AppConfig} from "../../app.config";
import {AgroTaskService} from "../../services/agrotask.service";
import "style-loader!fullcalendar/dist/fullcalendar.min.css";
import {AgrotaskModel} from "../agrotask-calendar/agrotask.model";
import {LangService} from "../../services/lang.service";

@Component({
  selector: 'az-agrotask-calendar',
  templateUrl: './agrotask-calendar.component.html',
  styleUrls: ['./agrotask-calendar.component.scss']
})
export class AgroTaskCalendarComponent {

  public config:any;
  public configFn:any;

  calendarOptions: any;
  $calendar: any;
  dragOptions: Object = { zIndex: 999, revert: true, revertDuration: 0 };
  event: any = {};
  createEvent: any;
  agrotaskModels: AgrotaskModel[];

  constructor(private _appConfig:AppConfig,
              private agroTaskService: AgroTaskService,
              private langService: LangService) {

      this.config = this._appConfig.config;
      this.configFn = this._appConfig;

    // let date = new Date();
    // let d = date.getDate();
    // let m = date.getMonth();
    // let y = date.getFullYear();

    this.calendarOptions = {
      locale: this.langService.getLanguage(),
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [
        // {
        //   title: 'All Day Event',
        //   start: new Date(y, m, 1),
        //   backgroundColor: this.config.colors.primary,
        //   textColor: this.config.colors.default,
        //   description: 'Will be busy throughout the whole day'
        // },
        // {
        //   title: 'Long Event',
        //   start: new Date(y, m, d + 5),
        //   end: new Date(y, m, d + 7),
        //   description: 'This conference should be worse visiting'
        // },
        // {
        //   id: 999,
        //   title: 'Blah Blah Car',
        //   start: new Date(y, m, d - 3, 16, 0),
        //   allDay: false,
        //   description: 'Agree with this guy on arrival time'
        // },
        // {
        //   id: 1000,
        //   title: 'Buy this template',
        //   start: new Date(y, m, d + 3, 12, 0),
        //   allDay: false,
        //   backgroundColor: this.config.colors.warning,
        //   textColor: this.config.colors.default,
        //   description: 'Make sure everything is consistent first'
        // },
        // {
        //   title: 'Got to school',
        //   start: new Date(y, m, d + 16, 12, 0),
        //   end: new Date(y, m, d + 16, 13, 0),
        //   backgroundColor:  this.config.colors.danger,
        //   textColor: this.config.colors.default,
        //   description: 'Time to go back'
        // },
        // {
        //   title: 'Study some Node',
        //   start: new Date(y, m, d + 18, 12, 0),
        //   end: new Date(y, m, d + 18, 13, 0),
        //   backgroundColor: this.config.colors.success,
        //   textColor: this.config.colors.default,
        //   description: 'Node.js is a platform built ' +
        //   'on Chrome\'s JavaScript runtime for easily' +
        //   ' building fast, scalable network applications.' +
        //   ' Node.js uses an event-driven, non-blocking' +
        //   ' I/O payloadModel that makes it lightweight and' +
        //   ' efficient, perfect for data-intensive real-time' +
        //   ' applications that run across distributed devices.'
        // },
        // {
        //   title: 'Azimuth link',
        //   start: new Date(y, m, 28),
        //   end: new Date(y, m, 29),
        //   url: 'http://themeseason.com/',
        //   backgroundColor: this.config.colors.info,
        //   textColor: this.config.colors.default,
        //   description: this.config.title
        // }
      ],
      eventColor: this.config.colors.info,
      selectable: true,
      selectHelper: true,
      select: (start, end, allDay): void => {
        this.createEvent = () => {
          let title = this.event.title;
          if (title) {
            this.$calendar.fullCalendar('renderEvent',
                {
                  title: title,
                  start: start,
                  end: end,
                  allDay: allDay,
                  backgroundColor: this.config.colors.success,
                  textColor: this.config.colors.default
                },
                true // make the event "stick"
            );
          }
          this.$calendar.fullCalendar('unselect');
          jQuery('#create-event-modal').modal('hide');
        };

        jQuery('#create-event-modal').modal('show');
      },
      eventClick: (event): void => {
        this.event = event;
        jQuery('#show-event-modal').modal('show');
      },
      editable: true,
      droppable: true,

      drop: (dateItem, event): void => { // this function is called when something is dropped
        // retrieve the dropped element's stored Event Object
        let originalEventObject = {
          // use the element's text as the event title
          title: jQuery.trim(jQuery(event.target).text())
        };

        // we need to copy it, so that multiple events don't have a reference to the same object
        let copiedEventObject = jQuery.extend({}, originalEventObject);

        // assign it the date that was reported
        copiedEventObject.start = dateItem;
        copiedEventObject.allDay = !dateItem.hasTime();

        let $categoryClass = jQuery(event.target).data('event-class');
        if ($categoryClass) { copiedEventObject.className = [$categoryClass]; }

        // render the event on the calendar
        // the last `true` argument determines if
        // the event 'sticks'
        // http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);

        jQuery(event.target).remove();

      },
      dayRender: function (date, cell) {
        let today = new Date().toDateString();
        let compareDate = date.toDate().toDateString();
        if (today == compareDate) {
          cell.css("background-color", "#ccc");
        }
      }
    };
  };

  addEvent(event): void {
    this.calendarOptions.events.push(event);
  };

  ngOnInit(): void {
    this.$calendar = jQuery('#calendar');
    this.$calendar.fullCalendar(this.calendarOptions);
    jQuery('.draggable').draggable(this.dragOptions);
    this.findAgroTasks();
  }

  private findAgroTasks() {
    this.agroTaskService.find().subscribe(payloadModel => {
        let status = payloadModel.status;
        let message = payloadModel.message;
        this.agrotaskModels = payloadModel.payload;

        for(var i=0; i <this.agrotaskModels.length; i++) {
            let agroEvent : any = {};

            agroEvent.id = this.agrotaskModels[i].id;
            agroEvent.workTypeId = this.agrotaskModels[i].workTypeId;
            agroEvent.title = this.agrotaskModels[i].title;
            agroEvent.start = new Date(this.agrotaskModels[i].scheduledStart);
            agroEvent.end = new Date(this.agrotaskModels[i].scheduledEnd);
            agroEvent.backgroundColor = this.getEventBackgroundColor(agroEvent.workTypeId);
            agroEvent.textColor = this.config.colors.default;
            agroEvent.description = this.agrotaskModels[i].description;
            agroEvent.createdBy = this.agrotaskModels[i].createdBy;
            this.$calendar.fullCalendar('renderEvent', agroEvent, true);
        }
    })

  }

  private getEventBackgroundColor(workTypeId) {
      switch(workTypeId) {
          case 1:
              return this.config.colors.success;
          case 2:
              return this.config.colors.primary;
          case 3:
              return this.config.colors.warning;
          case 4:
              return this.config.colors.danger;
          case 5:
              return this.config.colors.info;
          case 6:
              return this.config.colors.dark;
          default:
              return this.config.colors.gray;
      }
  }
}