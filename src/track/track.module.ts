import { Module } from "@nestjs/common";
import { TrackController } from "./track.controller";
import { TrackService } from "./track.sevice";



@Module({
  controllers: [TrackController],
  providers: [TrackService]
})
export class TrackModule {

}