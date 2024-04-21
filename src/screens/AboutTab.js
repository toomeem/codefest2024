import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native'

const stories = [
  {
    id: 1,
    name: 'Evan',
    image: 'https://live.staticflickr.com/65535/53668125985_15dcdae4cc_n.jpg',
  },
  {
    id: 2,
    name: 'Vruj',
    image: 'https://live.staticflickr.com/65535/53668119110_e2f4f973e3_n.jpg',
  },
  {
    id: 3,
    name: 'Krithi',
    image: 'https://live.staticflickr.com/65535/53667890918_b240f22b11_n.jpg',
  },
  {
    id: 4,
    name: 'Saksham',
    image: 'https://live.staticflickr.com/65535/53667887433_508aec5ec8_n.jpg',
  },
  {
    id: 5,
    name: 'Meghna',
    image: 'https://live.staticflickr.com/65535/53667687471_78f1ffc210_w.jpg',
  },
  {
    id: 6,
    name: 'Uditi',
    image: 'https://live.staticflickr.com/65535/53667681276_5d03acbaba_n.jpg',
  },
  {
    id: 7,
    name: 'Project Overview',
    image: 'https://live.staticflickr.com/65535/53668204935_a682ed5036_n.jpg',
  },
]

const StoryList = () => {
  return (
    <View style={styles.storyList}>
      <Text style={styles.storyListText}>Development Team</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {stories.map(story => (
          story.id !== 7 ?
          <View style={styles.storyContainer} key={story.id}>
            <Image style={styles.storyImage} source={{ uri: story.image }} />
            <Text style={styles.storyName}>{story.name}</Text>
          </View> : null
        ))}
      </ScrollView>
    </View>
  )
}

const AboutTab = () => {
  const [messages, setMessages] = useState([
    {
      id: 7,
      sender: 'Project Overview',
      text: "We are a team of 6 dedicated computer science students with a passion for making a difference in the world. Our project is a testament to our commitment to environmental sustainability. We believe that efficient waste management is key to a greener future, and we aim to contribute to this cause through our AI-powered waste sorting system. Let’s look at our hardworking and resilient team members:",
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53668204935_a682ed5036_n.jpg',
      image: 'https://live.staticflickr.com/65535/53667971388_3b6e049e11_w.jpg',
    },
    {
      id: 1,
      sender: 'Evan Toomey',
      text: 'Evan, a talented freshman in our team, is working on both back-end and front-end development. His skills ensure that “Bio Sortify” is not only functional but also user-friendly.',
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53668125985_15dcdae4cc_n.jpg',
      image: 'https://live.staticflickr.com/65535/53668217570_dd5f8c5b87_n.jpg',
    },
    {
      id: 2,
      sender: 'Vruj Patel',
      text: "Vruj, another genius freshman in our team, is our front-end developer. His keen eye for design and usability makes the interface of “Bio Sortify” intuitive and easy to navigate.",
      senderType: 'other',
      avatar: 'https://live.staticflickr.com/65535/53668119110_e2f4f973e3_n.jpg',
      image: 'https://live.staticflickr.com/65535/53667976073_1963388e9c_n.jpg',
    },
    {
      id: 3,
      sender: 'Krithi Hari',
      text: "Krithi , another freshman, joined Drexel in the fall of 2023. She has been endlessly working to build and test AI model that powers this project contributing to its accuracy and efficiency.",
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53667890918_b240f22b11_n.jpg',
      image: 'https://live.staticflickr.com/65535/53667979568_04a906b35d_n.jpg',
    },
    {
      id: 4,
      sender: 'Saksham Rajbhandari',
      text: "Saksham is a freshman at Drexel’s CCI. As our AI expert, he is building models and servers ensuring that the technical aspects of “Bio Sortify” are robust and reliable.",
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53667887433_508aec5ec8_n.jpg',
      image: 'https://live.staticflickr.com/65535/53668116024_2e8d2a29d1_n.jpg',
    },
    {
      id: 5,
      sender: 'Megha Rajbhandari',
      text: "Meghna, a first-year Computer Science graduate student at Drexel, brings a unique perspective to our team with her background in environmental engineering. Her understanding of environmental challenges and solutions greatly contributes to the sustainability aspect of “Bio Sortify”.",
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53667687471_78f1ffc210_w.jpg',
      image: 'https://live.staticflickr.com/65535/53668119029_7cd484d399_n.jpg',
    },
    {
      id: 6,
      sender: 'Uditi Shah',
      text: "Uditi, an enthusiastic first-year Data Science graduate student at Drexel, is utilizing her data analysis skills to optimize the performance of our AI model and enhance the overall effectiveness of the project.",
      senderType: 'user',
      avatar: 'https://live.staticflickr.com/65535/53667681276_5d03acbaba_n.jpg',
      image: 'https://live.staticflickr.com/65535/53668223605_425510eb0e_n.jpg',
    },
  ])

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Image style={styles.avatar} source={{ uri: item.avatar }} />
          <Text style={styles.sender}>{item.sender}</Text>
        </View>
        <View style={styles.cardBody}>
          {item.image && <Image style={styles.cardImage} source={{ uri: item.image }} />}
          <Text style={styles.cardText}>{item.text}</Text>
        </View>
        <View style={{height: 65}}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StoryList />
      <FlatList data={messages} renderItem={renderItem} keyExtractor={item => item.id.toString()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  storyList: {
    marginTop: -10,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  storyListText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  storyImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  storyName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
    backgroundColor:'white'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  cardBody: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  cardText: {
    marginTop: 10,
  },
})

export default AboutTab;
