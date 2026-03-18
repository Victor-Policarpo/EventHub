package com.victorpolicarpo.toyloop.service;


import com.victorpolicarpo.toyloop.exception.MessagingServiceException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String email;

    public void sendSimpleMail(String to, String name, String link) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("link", link);
            String htmlContent = templateEngine.process("RecoveryEmail", context);
            String fromDisplay = String.format("EventHub <%s>", email.trim());
            helper.setTo(to);
            helper.setSubject("Recuperação de Senha - EventHub");
            helper.setText(htmlContent, true);
            helper.setFrom(fromDisplay);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new MessagingServiceException(e.getMessage());
        }
    }
}
