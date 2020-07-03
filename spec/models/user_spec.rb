require 'rails_helper'

RSpec.describe User, :type => :model do
  subject {
    described_class.new(firstname: "Jyoti",
                        lastname: "Suvarna",
                        username: "suvarnajyoti",
                        email: "suvarnajyoti01@gmail.cm",
                        age: 25)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a firstname" do
    # user = User.new(firstname: nil)
    subject.firstname = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a lastname" do
    subject.lastname = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a username" do
    subject.username = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a email" do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a age" do
    subject.age = nil
    expect(subject).to_not be_valid
  end

end