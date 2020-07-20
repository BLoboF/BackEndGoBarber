/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointments';
import AppointmentsRepository from '../repository/appointmentsRepository';

interface Resquest {
  provider_id: string;
  date: Date;
}

class createAppointmentService {
  public async execute({ provider_id, date }: Resquest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    const findAppointmentSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default createAppointmentService;
