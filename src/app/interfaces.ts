/*
Most of these interfaces were created by running the API call, copying the returned JSON into 
https://app.quicktype.io/. 
A few naming changes had to be done for QItem and QItemLinks
*/

export interface tokenData {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface AgentsStates {
    _links:    AgentsStatesLinks;
    count:     number;
    _embedded: AgentsStatesEmbedded;
}

export interface AgentsStatesEmbedded {
    items: Item[];
}

export interface Item {
    _links:                             ItemLinks;
    id:                                 string;
    firstName:                          string;
    lastName:                           string;
    reporting:                          string;
    employeeRefId:                      string;
    mediaServerRefId:                   string;
    mediaType:                          string;
    mediaServerType:                    string;
    currentState:                       string;
    enteredStateOn:                     Date;
    reason:                             string;
    photoUrl:                           string;
    openMediaSlots:                     number;
    acdConversationsToday:              number;
    nonAcdConversationsToday:           number;
    presentInAgentGroups:               string[];
    occupiedDurationToday:              string;
    acdDurationToday:                   string;
    doNotDisturbDurationToday:          string;
    holdAcdDurationToday:               string;
    holdNonAcdDurationToday:            string;
    holdOutboundDurationToday:          string;
    makeBusyDurationToday:              string;
    nonAcdDurationToday:                string;
    outboundDurationToday:              string;
    workTimerDurationToday:             string;
    averageAnsweredDurationToday:       string;
    loggedInDurationToday:              string;
    lastLoginTime:                      Date;
    lastLogoffTime:                     Date;
    loggedInNotPresentDurationToday:    string;
    externalAnswerDurationToday:        string;
    workloadLimit:                      number;
    currentActive:                      number;
    currentWorktimer:                   number;
    averageTime:                        string;
    totalAcdDuration:                   string;
    totalNonAcdDuration:                string;
    unavailablePercentToday:            number;
    outboundConversationsToday:         number;
    externalOutboundConversationsToday: number;
    externalInboundConversationsToday:  number;
    availableState:                     string;
    _embedded:                          ItemEmbedded;
}

export interface ItemEmbedded {
}

export interface ItemLinks {
    self:  Self;
    agent: Self;
}

export interface Self {
    href: string;
}

export interface AgentsStatesLinks {
    self: Self;
}

export interface QueuesState {
    _links:    QueuesStateLinks;
    count:     number;
    _embedded: QueuesStateEmbedded;
}

export interface QueuesStateEmbedded {
    items: QItem[];
}

export interface QItem {
    _links:                                                 QItemLinks;
    id:                                                     string;
    abandonedConversationsAverageDurationToday:             string;
    abandonedConversationsInTheLast15Minutes:               number;
    abandonedConversationsInTheLastHour:                    number;
    abandonedConversationsPercentageInTheLast15Minutes:     number;
    abandonedConversationsPercentageInTheLastHour:          number;
    abandonedConversationsPercentageToday:                  number;
    abandonedConversationsToday:                            number;
    agentLoggedInTotalDurationToday:                        string;
    agentsAvailable:                                        number;
    agentsIdle:                                             number;
    agentsOnAcdConversations:                               number;
    agentsOnNonAcdConversations:                            number;
    agentsOnOutboundConversations:                          number;
    agentsUnavailable:                                      number;
    agentsUnavailableInTheLast15Minutes:                    number;
    agentsUnavailableInTheLastHour:                         number;
    answeredConversationsAverageDurationInTheLast15Minutes: string;
    answeredConversationsAverageDurationInTheLastHour:      string;
    answeredConversationsAverageDurationToday:              string;
    answeredConversationsByAgentGroup1Today:                number;
    answeredConversationsByAgentGroup2Today:                number;
    answeredConversationsByAgentGroup3Today:                number;
    answeredConversationsByAgentGroup4Today:                number;
    answeredConversationsInTheLast15Minutes:                number;
    answeredConversationsInTheLastHour:                     number;
    answeredConversationsPercentageByAgentGroup1Today:      number;
    answeredConversationsPercentageByAgentGroup2Today:      number;
    answeredConversationsPercentageByAgentGroup3Today:      number;
    answeredConversationsPercentageByAgentGroup4Today:      number;
    answeredConversationsPercentageInTheLast15Minutes:      number;
    answeredConversationsPercentageInTheLastHour:           number;
    answeredConversationsPercentageToday:                   number;
    answeredConversationsToday:                             number;
    conversationAverageDurationInTheLast15Minutes:          string;
    conversationAverageDurationInTheLastHour:               string;
    conversationAverageDurationToday:                       string;
    conversationTotalDurationToday:                         string;
    estimatedWaitTimeForNewConversations:                   string;
    interflowedConversationsInTheLast15Minutes:             number;
    interflowedConversationsInTheLastHour:                  number;
    interflowedConversationsToday:                          number;
    isInDoNotDisturb:                                       boolean;
    longestWaitingConversationDuration:                     string;
    longestWaitingStartedTime:                              Date;
    longestWaitingStartedTimeMediaServerId:                 string;
    makeBusyTotalDurationToday:                             string;
    offeredConversationsInTheLast15Minutes:                 number;
    offeredConversationsInTheLastHour:                      number;
    offeredConversationsToday:                              number;
    name:                                                   string;
    reporting:                                              string;
    isGroup:                                                boolean;
    mediaType:                                              string;
    requeuedConversationsToday:                             number;
    serviceLevelPercentageInTheLast15Minutes:               number;
    serviceLevelPercentageInTheLastHour:                    number;
    serviceLevelPercentageToday:                            number;
    serviceLevelGoalPercentage:                             number;
    timeOfLastReceivedUpdate:                               Date;
    transfersToUnavailableQueue:                            number;
    transfersToUnavailableQueueTotalToday:                  number;
    waitingConversations:                                   number;
    workTimerTotalDurationToday:                            string;
    _embedded:                                              ItemEmbedded;
}


export interface QItemLinks {
    self:  Self;
    queue: Self;
}

export interface QueuesStateLinks {
    self: Self;
}

/*Used when importing the settings.json file */
export interface settingsFile {
    refreshTime: number;
    serverUrl: string;
    apiUsername: string;
    apiPassword: string;
    activeQ: number;
    wallBanner: string;
}