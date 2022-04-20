import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from "./track/track.module";



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://shema:vbrjkf1@cluster0.qqhgt.mongodb.net/test-aplication?retryWrites=true&w=majority'),
    TrackModule
  ]
})
export class AppModule {

}
