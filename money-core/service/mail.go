package service

import (
	"fmt"
	"money-core/config"
	"net/smtp"
	"strconv"
)

type (
	MailServiceInterface interface {
		SendMail(email string, token string) error
	}
	MailService struct {
		*config.MailConfig
	}
)

func NewMailService(config *config.MailConfig) *MailService {
	return &MailService{
		config,
	}
}

func (m *MailService) SendMail(email string, token string) error {
	fmt.Println(fmt.Sprintf("Sending mail to %s", email))
	var link = m.Link + token + "&email=" + email
	auth := smtp.PlainAuth("", m.Email, m.Password, m.Smtphost)
	message := fmt.Sprintf(`To: %s
						From: %s
						Subject: Reset Password from
						MIME-version: 1.0;
						Content-Type: text/html; charset="UTF-8"
						
						<html><body>
						Your reset password link: <a href="%s">%s</a>
						<body></html>`, email, m.Email, link, link)
	err := smtp.SendMail(m.Smtphost+":"+strconv.Itoa(m.Smtpport), auth, m.Email, []string{email}, []byte(message))
	if err != nil {
		return err
	}
	return nil
}
