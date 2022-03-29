





Responses_per_Village<- data.frame(table(dat$Village))
colnames(Responses_per_Village)<- c("Village", "Nombre des Réponses")
write.csv(Responses_per_Village,"Word_Outputs/1.Resume_des_Enquetes/Responses_per_village.csv",  row.names = F)

png("Word_Outputs/1.Resume_des_Enquetes/1.Responses_par_Village.png")
par(mar=c(10,4,4,1), mfrow=c(1,1),mgp=c(3,2,0), cex=(0.8))
barplot(Responses_per_Village$`Nombre des Réponses`, las=2, ylab="Nombre de Ménages", main = "Nombre de Ménages par Village", names.arg = Responses_per_Village$Village)
dev.off()



Responses_per_Village<-data.frame(Responses_per_Village)
colnames(Responses_per_Village)<- c("Village", "Nombre de Ménages")
write.csv(Responses_per_Village,"Word_Outputs/1.Resume_des_Enquetes/1.Reponses_par_Villages.csv",row.names = F)


#--------------------------------------------------------------------------------------------------------------------


### 
# respondent_start<-dat_all$respondent_start
# respondent_start<-gsub("Male_head", "Male", respondent_start)
# respondent_start<-gsub("Female_head", "Female", respondent_start)
# respondent_start<-gsub("NA", NA, respondent_start)
# respondent_start<-gsub("Male_adult", "Male", respondent_start)
# respondent_start<-gsub("Female_adult", "Female", respondent_start)
# respondent_start<-gsub("Female_Youth_or_Child", "Female", respondent_start)
# respondent_start<-gsub("senior_male", "Male", respondent_start)
# respondent_start<-gsub("senior_woman", "Female", respondent_start)
# respondent_start<-gsub("young_woman", "Female", respondent_start)
# respondent_start<-gsub("young_man", "Male", respondent_start)
# 
# 
# 
# respondent_end<- dat_all$respondent_ntfp
# respondent_end<-gsub("senior_woman", "Female", respondent_end)
# respondent_end<-gsub("same_person", "Same", respondent_end)
# respondent_end<-gsub("NA", NA, respondent_end)
# respondent_end<-gsub("young_woman", "Female", respondent_end)
# respondent_end<-gsub("young_man", "Male", respondent_end)
# respondent_end<-gsub("senior_male", "Male", respondent_end)
# 
# 
# respondent_changes<-data.frame(respondent_start, respondent_end)
# respondent_changes <- data.frame(lapply(respondent_changes, as.character), stringsAsFactors=FALSE)
# 
# for (i in 1:nrow(respondent_changes))
# {
#   if (!is.na(respondent_changes$respondent_end[i]))
#   {
#     if (respondent_changes$respondent_end[i]=="Same")
#     {
#       respondent_changes$respondent_end[i]<- respondent_changes$respondent_start[i]
#     }
#   }
# }
# 
# overview_respondent_changes<- data.frame(table(respondent_changes))
# overview_respondent_changes$percentage<-round(prop.table(overview_respondent_changes$Freq),2)
# 
# 
# plot_male_female_change<- data.frame("Respondent_Gender"=c("Female Throughout", "Male to Female", "Female to Male", "Male Throughout"),
#                                      "Percentage"= overview_respondent_changes$percentage*100)
# #png("Word_Outputs/1.Resume_des_Enquetes/4.male_female_respondents.png")
# male_female_plot<- ggplot(plot_male_female_change, aes(y=Percentage, x=Respondent_Gender))
# male_female_plot<- male_female_plot+geom_bar(stat="identity", fill="steelblue")
# male_female_plot<- male_female_plot+geom_text(aes(label=paste0(Percentage,"%")), vjust=1.6, color="white", size=3.5)
# male_female_plot<- male_female_plot+theme_minimal()+labs(title="Changes in Respondent from Beginning to End of Interview", 
#                                                          x="Respondents Gender", y = "Percentage of Population")
# male_female_plot
# ggsave("Word_Outputs/1.Resume_des_Enquetes/3.male_female_respondents.png")
# 
# write.csv(plot_male_female_change, "Word_Outputs/1.Resume_des_Enquetes/3.male_female_respondents_table.csv")
# 

