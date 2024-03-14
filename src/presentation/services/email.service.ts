import nodemailer, { Transporter } from 'nodemailer';


export interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter: Transporter;

  constructor(
    mailerService: string,
    mailerEmail: string,
    mailerSecretKey: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey
      }
    })
  }




  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, html, attachments = [] } = options;

    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html,
        attachments,
      })


      return true
    } catch (error) {
      return false
    }
  }


}
